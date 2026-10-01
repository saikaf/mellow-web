export default function ResponsiveCopy({ desktop, mobile }: {
  desktop: React.ReactNode; mobile: React.ReactNode;
}) {
  return <><span className="copy-desktop">{desktop}</span><span className="copy-mobile">{mobile}</span></>;
}
