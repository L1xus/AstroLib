'use client'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import type { ToolbarProps, ToolbarSlot, TransformToolbarSlot } from '@react-pdf-viewer/toolbar'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

interface PdfViewerProps {
  url: string
}

const PdfViewer = ({ url }: PdfViewerProps) => {
    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
        ...slot,
        Download: () => <></>,
        DownloadMenuItem: () => <></>,
        Print: () => <></>,
        Open: () => <></>,
    })

    const renderToolbar = (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    )
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
    })
    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance

 return (
    <div className='max-w-7xl mx-auto my-3 p-6 bg-[#f5f4f1] rounded-lg'>
      <div className="h-screen">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={url}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
 )
}

export default PdfViewer
