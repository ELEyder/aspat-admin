import { useEffect } from "react";

interface PptxViewerProps {
  signedUrl: string;
}

const PptxViewer: React.FC<PptxViewerProps> = ({ signedUrl }) => {
  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    signedUrl
  )}`;

  useEffect(()=> {
    console.log(signedUrl)
  }, [])
  return (
    <iframe
      src={officeViewerUrl}
      width="100%"
      height="100%"
      allowFullScreen
      title="PPTX Viewer"
    />
  );
};

export default PptxViewer;
