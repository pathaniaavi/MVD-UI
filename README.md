# MVDUI

MVDUI is a data dashboard application built using the latest version of Angular. This README provides information on how to set up and run the project, as well as details on various commands and functionalities available.

## Project Description

MVDUI is a data dashboard application designed to provide a comprehensive interface for data visualization and management. It leverages Angular's robust framework to deliver a seamless and responsive user experience.

## Dataspace - EDC

This project utilizes Dataspace - EDC (Enterprise Data Catalog) to manage and integrate various data sources effectively. The prerequisite for this project is to have a Minimum Viable Dataspace (MVD) set up to ensure smooth data operations and integrations.

For more information on setting up and using Dataspace - EDC, refer to the [MVD-UI repository](https://github.com/pathaniaavi/MVD-UI).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Angular CLI version 18.0.3 or higher
- Node.js and npm installed
- Minimum viable dataspace (EDC) configured
- Backend service set up

To set up the Minimum Viable Dataspace (MVD), refer to the [MVD GitHub repository](https://github.com/eclipse-edc/MinimumViableDataspace).

To set up the backend service, refer to the [MVD-backend repository](https://github.com/pathaniaavi/MVD-backend).

The goal of this setup is to provide sovereignty data transfer among the data space between Company 1 and Company 2.

## Development Server

To start the development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Scaffolding

To generate a new component, run:

```bash
ng generate component component-name
```

You can also use the following commands to generate other Angular elements:

- Directive: `ng generate directive directive-name`
- Pipe: `ng generate pipe pipe-name`
- Service: `ng generate service service-name`
- Class: `ng generate class class-name`
- Guard: `ng generate guard guard-name`
- Interface: `ng generate interface interface-name`
- Enum: `ng generate enum enum-name`
- Module: `ng generate module module-name`

## Build

To build the project, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

To execute the unit tests via [Karma](https://karma-runner.github.io), run:

```bash
ng test
```

## Running End-to-End Tests

To execute end-to-end tests, you need to add a package that implements end-to-end testing capabilities. After adding the necessary package, run:

```bash
ng e2e
```

## Further Help

For more help on the Angular CLI, use:

```bash
ng help
```

Or visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For more details on the MVDUI project, visit the [MVD-UI repository](https://github.com/pathaniaavi/MVD-UI).
