import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("http://185.238.72.187:8055").with(rest());

export default directus;
