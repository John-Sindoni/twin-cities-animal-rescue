# Twin Cities Animal Rescue

An Introduction to Web Development Touchstone project by John Sindoni. This client website introduces an animal rescue and helps visitors explore adoption, fostering, and volunteering.

## Pages

Page Purpose 
- Home - Introduces the mission and directs visitors to ways they can help. 
- Services - Explains adoption, fostering, and volunteering, with video and audio messages. 
- About - Presents the rescue's story, values, partners, and a pet spotlight. 
- Contact - Provides an interest form, service area, and office hours. 

## Features

- Consistent header and footer navigation, with the current page identified.
- Responsive layouts and images that fit narrow screens.
- An interest description that changes when visitors select Volunteer, Foster, or Adoption Information.
- An availability summary that updates as days are selected.
- Saved interest and availability choices using localStorage, restored after refresh.
- Inline validation messages and focus movement to the first invalid field on submission.
- A demonstration success message after valid form entries.

Only interest and availability are stored. Names, email addresses, phone numbers, and written responses are not saved by the script. Preferences are stored in the current browser, local and published previews have separate saved choices.

## Accessibility considerations

The site includes semantic headings, image alt text, a skip link, labeled form controls, fieldsets and legends, visible keyboard focus, and reduced-motion styling. Validation uses aria-invalid and associated error messages, with live regions for feedback.

Automated Lighthouse results complement manual checks. A score of 100 does not establish complete accessibility. 

## Testing

Manual checks completed during development.

- Safari and Chrome: required-field errors, focus on the first invalid field, saved preferences after refresh, navigation, and narrow-window layouts.
- Safari: invalid email feedback and focus movement to the email field.
- Chrome: all four pages visually checked at a 375-pixel viewport, plus keyboard focus visibility and navigation using Enter.
- Safari and Chrome: video and audio playback checked before the video preload change. Video playback after that change was also manually confirmed.

### Mobile Lighthouse results

(Page - Initial performance - Latest performance - Accessibility - Best practices - Latest SEO )
- Home | 75 | 97 | 100 | 100 | 100 |
- Services | 75 | 95 | 100 | 100 | 100 |
- About | 78 | 99 | 100 | 100 | 100 |
- Contact | 100 | 100 | 100 | 100 | 100 |

Each page's initial SEO score was 91. Adding a page-specific meta description resolved the missing-description warning.

### Improvements made after testing

- Exported smaller JPG copies of photographs and updated the pages to use them, while retaining original PNGs.
- Added explicit dimensions to Services and About images to reserve space during loading.
- Added high download priority to the logo on Home, Services, and About.
- Set the Services video to preload="none" to request that its download wait until playback.
- Added focus movement to the first invalid form field.
- Added explanatory JavaScript comments for storage, validation, and accessibility behavior.