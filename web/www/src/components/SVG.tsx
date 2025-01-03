type SVGProps = {
  content: string;
} & React.ComponentProps<"img">;
export default function SVG({ content, ...props }: SVGProps) {
  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(content)}`}
      {...props}
    />
  );
}
