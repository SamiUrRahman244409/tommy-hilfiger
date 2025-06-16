// Media names mapping for landing page components based on Strapi "Name" field
export const LANDING_MEDIA = {
  hero: {
    desktop: "hero-section-md",
    mobile: "hero-section-sm",
  },
  featuredCollections: {
    grid03_01: "featured-collection-1",
    grid03_02: "featured-collection-2",
    grid04_01: "featured-collection-3",
    grid04_02: "featured-collection-4",
  },
  video: {
    desktop: "video-section-md-video",
    mobile: "video-section-sm-video", // Changed to get the actual video file
    posterDesktop: "video-section-md-img",
    posterMobile: "hero-section-sm", // Changed to use hero section image as poster
  },
  categoryNavigation: {
    dressShop: "category-navigation-1",
    logoShop: "category-navigation-2",
    butterYellow: "category-navigation-3",
    tommyStories: "category-navigation-4",
  },
} as const
