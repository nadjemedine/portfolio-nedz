import { client } from './sanity';

// ─── Hero / About ────────────────────────────────────────────────────────────
export async function getHeroData() {
  return client.fetch(`*[_type == "hero"][0]{
    name,
    titleAr, titleFr, titleEn,
    subtitleAr, subtitleFr, subtitleEn,
    bioAr, bioFr, bioEn,
    image,
    cvUrl,
    skills,
    yearsOfExperience,
    projectsCount,
    clientsCount
  }`);
}

// ─── About Page ──────────────────────────────────────────────────────────────
export async function getAboutData() {
  return client.fetch(`*[_type == "about"][0]{
    bioAr, bioFr, bioEn,
    image,
    skills[]{
      category,
      items
    },
    experiences[]{
      company,
      roleAr, roleFr, roleEn,
      startDate, endDate,
      descriptionAr, descriptionFr, descriptionEn
    },
    education[]{
      institution,
      degreeAr, degreeFr, degreeEn,
      year
    },
    whyMeAr, whyMeFr, whyMeEn,
    services[]{
      iconName,
      titleAr, titleFr, titleEn,
      descriptionAr, descriptionFr, descriptionEn
    }
  }`);
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(orderRank asc){
    _id,
    slug,
    titleAr, titleFr, titleEn,
    descriptionAr, descriptionFr, descriptionEn,
    mainImage,
    images,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    year
  }`);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(`*[_type == "project" && slug.current == $slug][0]{
    _id,
    slug,
    titleAr, titleFr, titleEn,
    descriptionAr, descriptionFr, descriptionEn,
    longDescriptionAr, longDescriptionFr, longDescriptionEn,
    mainImage,
    images,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    year,
    client
  }`, { slug });
}

// ─── Contact Info ─────────────────────────────────────────────────────────────
export async function getContactData() {
  return client.fetch(`*[_type == "contact"][0]{
    email,
    phone,
    location,
    github,
    linkedin,
    twitter,
    availability
  }`);
}

// ─── Site Settings ────────────────────────────────────────────────────────────
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    siteNameAr, siteNameFr, siteNameEn,
    logo,
    favicon
  }`);
}

// ─── Resume ───────────────────────────────────────────────────────────────────
export async function getResumeData() {
  return client.fetch(`*[_type == "resume"][0]{
    titleAr, titleFr, titleEn,
    summaryAr, summaryFr, summaryEn,
    experiences[]{
      company,
      roleAr, roleFr, roleEn,
      startDate, endDate,
      descriptionAr, descriptionFr, descriptionEn
    },
    education[]{
      institution,
      degreeAr, degreeFr, degreeEn,
      year
    },
    skills[]{
      category,
      items
    },
    "resumeFileUrl": resumeFile.asset->url,
    lastUpdated
  }`);
}
