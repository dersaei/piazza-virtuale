import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("http://directus:8055").with(rest());

export default directus;
