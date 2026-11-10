import { buildDetailContent } from "./detail-content-types";
import { detailWoodworkPairs } from "./detail-woodwork-content";
import { detailProjectPairs } from "./detail-project-content";

const detailContent = buildDetailContent([...detailWoodworkPairs, ...detailProjectPairs]);
export const detailMoneyPages = detailContent.pages;
export const detailPosts = detailContent.posts;
