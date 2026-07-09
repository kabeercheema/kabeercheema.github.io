import { getAssetPath } from "../utils/assetPath";

export const RESUME_VERSION = "2026-05-13";
export const getResumeUrl = () => `${getAssetPath("resume.pdf")}?v=${RESUME_VERSION}`;
