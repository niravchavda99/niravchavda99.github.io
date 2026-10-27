import Image from "next/image";
import { Blocks, Building2, Cloud } from "lucide-react";
import { organizationLogos, technologyIcons } from "@/src/content/visuals";

/** Brand assets are decorative because the adjacent text names each item. */
export function ContentIcon({
  name,
  organization = false,
}: {
  name: string;
  organization?: boolean;
}) {
  const image = (organization ? organizationLogos : technologyIcons)[name];
  const Fallback = organization
    ? Building2
    : ["Azure", "GCP"].includes(name)
      ? Cloud
      : Blocks;
  return (
    <span
      className={organization ? "organization-logo" : "technology-icon"}
      aria-hidden="true"
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={organization ? 44 : 24}
          height={organization ? 44 : 24}
        />
      ) : (
        <Fallback size={organization ? 24 : 22} />
      )}
    </span>
  );
}
