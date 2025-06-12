import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url"; // or pdf.worker.js?url for older versions
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css"; // This is crucial for annotation styles
import "react-pdf/dist/Page/TextLayer.css";
export default function PDFViewer({ filepath, file_title }) {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
    const [numPages, setNumPages] = useState(null);

    const [pageWidth, setPageWidth] = useState(null);
    const containerRef = useRef(null);
    const [pdfError, setPdfError] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPdfError(null);
    }

    function onDocumentLoadError(error) {
        console.error("Error loading PDF document:", error);
        setPdfError(error.message || "Failed to load PDF.");
        setNumPages(null);
    }

    useEffect(() => {
        const calculatePageWidth = () => {
            if (containerRef.current) {
                setPageWidth(containerRef.current.clientWidth);
            }
        };

        calculatePageWidth();

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setPageWidth(entry.contentRect.width);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div className="h-[85vh] overflow-y-auto" ref={containerRef}>
            <div className="py-1 bg-[#FCF6F5] text-indigo-900 border rounded-xl border-indigo-900 sticky top-0 z-20 flex items-center px-2 justify-between gap-10">
                <a
                    href={filepath}
                    download={file_title}
                    className="px-5 py-1 rounded-xl border hover:text-white  hover:bg-indigo-900"
                >
                    download
                </a>
                <p className="px-3">{file_title}</p>
                <div className="flex justify-center items-center gap-4 p-2  rounded-lg shadow-sm">
                    <span className="text-lg font-medium">
                        {numPages + " pages" || "Loading..."}
                    </span>
                </div>
            </div>

            {pageWidth && (
                <Document
                    file={filepath}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                        <div className="text-center p-4">Loading PDF...</div>
                    }
                    error={
                        pdfError ? (
                            <div className="text-center p-4 text-red-500">
                                Error: {pdfError}
                            </div>
                        ) : (
                            <div className="text-center p-4 text-red-500">
                                Failed to load PDF.
                            </div>
                        )
                    }
                    className="w-full h-full"
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page
                            pageNumber={index + 1}
                            key={`page_${index + 1}`}
                            width={pageWidth}
                            renderAnnotationLayer={true}
                            renderTextLayer={true}
                            className="pdf-page-wrapper w-full h-auto"
                        />
                    ))}
                </Document>
            )}
        </div>
    );
}
