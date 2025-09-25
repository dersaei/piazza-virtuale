import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus("https://admin.piazzavirtuale.it").with(rest());

export default directus;
