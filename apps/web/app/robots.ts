import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/dashboard/"], // Don't index API or private dashboard
        },
        sitemap: "https://thelaundryhive.com/sitemap.xml", // Replace with actual domain
    };
}
