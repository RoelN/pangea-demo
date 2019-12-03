## Project setup & development

This project requires Node.js >= 12 and [yarn](https://yarnpkg.com/).

To get started, run the following commands from the root of the repo:

- `yarn install`
- `yarn start` - this will start the local development server, view at http://localhost:8080.

The site will [automatically](./.github/workflows/ci.yml) be re-built and deployed on Github Pages every time the master branch is updated.

## Checklist / getting started

- Configure the site in `_data/site.js`.
- Add/edit font related data in the files in the `_data` directory.
- In JavaScript, respond to fail/success of loading the font in the `FontFaceObserver` code.
- In HTML/CSS, use the `.variable-support` element to commuicate when variable fonts aren't supported.
- Add `.animates` class to all elements that animate (and need to pause when outside viewport).

## Components

The boilerplate has some basic components you can base your specimen site on:

### Character Grid

Simple grid to show all characters in the font. Currently has no hover/interaction.

### Interactive Controls

To get axes sliders and a element of text that responds to those, put an `.interactive-controls` class on the container, put some axes sliders in there, and a text container with the class `.interactive-controls-text`.

### Animation

Any element that animates should get an `animates` class. When this element is not in view, animations will be paused to avoid unnecessary performance impact. When in view, element will get `.in-view` class added. Make sure you actually toggle `animation-play-state` yourself when the class is present/absent.

Note: this can be repurposed for lazy loading images, pausing video, etc.
