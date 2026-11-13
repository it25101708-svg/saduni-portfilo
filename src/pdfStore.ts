/**
 * IndexedDB storage for device-uploaded PDFs (CV, Research Proposals, Artifacts)
 * with robust client-side fallback PDF generator.
 */

const DB_NAME = 'portfolio_pdf_store';
const STORE_NAME = 'pdfs';

export interface StoredPdfRecord {
  key: string;
  dataUrl: string;
  name: string;
  updatedAt: number;
}

export function openPdfDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function storePdfToDB(key: string, dataUrl: string, name: string): Promise<void> {
  const db = await openPdfDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putReq = store.put({ key, dataUrl, name, updatedAt: Date.now() });
    putReq.onsuccess = () => resolve();
    putReq.onerror = () => reject(putReq.error);
  });
}

export async function getPdfFromDB(key: string): Promise<{ dataUrl: string; name: string } | null> {
  try {
    const db = await openPdfDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(key);
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => reject(getReq.error);
    });
  } catch (err) {
    console.error('IndexedDB getPdf error:', err);
    return null;
  }
}

export async function deletePdfFromDB(key: string): Promise<void> {
  try {
    const db = await openPdfDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const delReq = store.delete(key);
      delReq.onsuccess = () => resolve();
      delReq.onerror = () => reject(delReq.error);
    });
  } catch (err) {
    console.error('IndexedDB deletePdf error:', err);
  }
}

export async function hasPdfInDB(key: string): Promise<boolean> {
  const item = await getPdfFromDB(key);
  return !!item;
}

/**
 * Generates a valid standard PDF 1.4 document base64 data URL on the fly.
 * Used as an instant fallback when no custom PDF file has been uploaded yet.
 */
export function generateFallbackPdfDataUrl(
  title: string,
  subtitle: string,
  lines: string[]
): string {
  const cleanTitle = (title || 'Academic Document').replace(/[()\\]/g, '');
  const cleanSubtitle = (subtitle || 'Saduni Ranasinghe • Educator & Academic Mentor').replace(/[()\\]/g, '');

  const contentStream = [
    'BT',
    '/F1 20 Tf',
    '50 740 Td',
    `(${cleanTitle}) Tj`,
    '/F1 12 Tf',
    '0 -30 Td',
    `(${cleanSubtitle}) Tj`,
    '0 -30 Td',
    ...lines.map((l) => `0 -20 Td (${l.replace(/[()\\]/g, '')}) Tj`),
    'ET'
  ].join('\n');

  const streamLen = new TextEncoder().encode(contentStream).length;

  const obj1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const obj2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const obj3 =
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n';
  const obj4 = `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${contentStream}\nendstream\nendobj\n`;
  const obj5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';

  const header = '%PDF-1.4\n';
  const offsets: number[] = [];
  let currentOffset = header.length;

  const objs = [obj1, obj2, obj3, obj4, obj5];
  let body = '';
  for (let i = 0; i < objs.length; i++) {
    offsets.push(currentOffset);
    body += objs[i];
    currentOffset += objs[i].length;
  }

  const xrefOffset = currentOffset;
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (const off of offsets) {
    xref += String(off).padStart(10, '0') + ' 00000 n \n';
  }
  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const pdfString = header + body + xref + trailer;
  const base64 = btoa(unescape(encodeURIComponent(pdfString)));
  return `data:application/pdf;base64,${base64}`;
}

/**
 * Downloads a PDF by key from IndexedDB or generates the fallback PDF.
 */
export async function downloadPdfByKey(
  key: string,
  defaultFileName: string,
  fallback: { title: string; subtitle: string; lines: string[] }
): Promise<void> {
  const existing = await getPdfFromDB(key);
  let downloadUrl = existing?.dataUrl;
  let downloadName = existing?.name || defaultFileName;

  if (!downloadUrl) {
    downloadUrl = generateFallbackPdfDataUrl(fallback.title, fallback.subtitle, fallback.lines);
  }

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = downloadName.endsWith('.pdf') ? downloadName : `${downloadName}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/**
 * Opens a PDF in a new browser tab for reading online.
 */
export async function openPdfByKeyInNewTab(
  key: string,
  fallback: { title: string; subtitle: string; lines: string[] }
): Promise<void> {
  const existing = await getPdfFromDB(key);
  let dataUrl = existing?.dataUrl;

  if (!dataUrl) {
    dataUrl = generateFallbackPdfDataUrl(fallback.title, fallback.subtitle, fallback.lines);
  }

  // Convert dataUrl to Blob URL for clean new tab preview
  try {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  } catch (err) {
    console.error('Failed to open PDF blob:', err);
    window.open(dataUrl, '_blank');
  }
}
