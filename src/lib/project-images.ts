import type { StaticImageData } from "next/image";
import type { ProjectImage } from "@/data/portfolio";
import codekhojLanding from "@/assets/projects/codekhoj-landing.png";
import codekhojLesson from "@/assets/projects/codekhoj-lesson.png";
import playhireLanding from "@/assets/projects/playhire-landing.png";
import playhireMaster from "@/assets/projects/playhire-master.png";
import eyecoin from "@/assets/projects/eyecoin.png";
import isai from "@/assets/projects/isai.png";
import simplycavapoos from "@/assets/projects/simplycavapoos.png";
import olx from "@/assets/projects/olx.png";
import apple from "@/assets/projects/apple.png";

// Screenshots of the live sites (1440×900), keyed by the names used in src/data/portfolio.ts.
export const projectImages: Record<ProjectImage, StaticImageData> = {
  "codekhoj-landing": codekhojLanding,
  "codekhoj-lesson": codekhojLesson,
  "playhire-landing": playhireLanding,
  "playhire-master": playhireMaster,
  eyecoin,
  isai,
  simplycavapoos,
  olx,
  apple,
};
