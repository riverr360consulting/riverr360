import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ 
          label: 'Meta Description',
          multiline: true,
          validation: { length: { max: 160 } }
        }),
        excerpt: fields.text({ 
          label: 'Excerpt',
          multiline: true,
          validation: { length: { max: 300 } }
        }),
        coverImage: fields.text({ 
          label: 'Cover Image URL (optional)',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'SEO', value: 'seo' },
            { label: 'PPC', value: 'ppc' },
            { label: 'Content Marketing', value: 'content-marketing' },
            { label: 'Email Marketing', value: 'email-marketing' },
            { label: 'Social Media', value: 'social-media' },
            { label: 'Analytics', value: 'analytics' },
            { label: 'Conversion Optimization', value: 'conversion' },
            { label: 'General', value: 'general' },
          ],
          defaultValue: 'general',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: props => props.value
          }
        ),
        author: fields.text({ 
          label: 'Author Name',
          defaultValue: 'Riverr360 Team'
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        featured: fields.checkbox({ 
          label: 'Featured Post',
          defaultValue: false
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'content/case-studies/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        industry: fields.text({ label: 'Industry' }),
        challenge: fields.text({ label: 'Challenge' }),
        result: fields.text({ label: 'Result' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        featured: fields.checkbox({ label: 'Featured' }),
      },
    }),
  },
  singletons: {
    homePage: {
      label: 'Home Page',
      path: 'content/home/',
      schema: {
        heroHeadline: fields.text({ label: 'Hero Headline' }),
        heroSubheadline: fields.text({ label: 'Hero Subheadline', multiline: true }),
        heroCTAText: fields.text({ label: 'Hero CTA Text' }),
        leakageExplanation: fields.document({
          label: 'Revenue Leakage Explanation',
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    },
    profile: {
      label: 'Profile Page',
      path: 'content/profile/',
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Professional Title' }),
        bio: fields.document({
          label: 'Biography',
          formatting: true,
          dividers: true,
          links: true,
        }),
        expertise: fields.array(
          fields.object({
            title: fields.text({ label: 'Expertise Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'Expertise Areas', itemLabel: props => props.fields.title.value }
        ),
        certifications: fields.array(
          fields.text({ label: 'Certification' }),
          { label: 'Certifications' }
        ),
      },
    },
  },
});
