<h1 align="center">
  <img src="https://github.com/evankirkiles/cpsc419-yale-universed/assets/30581915/d8f2ce2d-ccb8-4788-8580-259aab76cbec" width="200px"/>
  <br/>
  Yale Vision
</h1>

<p align="center">
Yale in 3D—exploring student-curated spaces on and off campus.
</p>

<p align="center">
  <a href="https://cpsc419-yale-universed.vercel.app" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/deployments/evankirkiles/cpsc419-yale-universed/production?label=vercel"></a>
</p>

<p align="center">
Powered by <strong>Three.js</strong> and <strong>Polycam</strong>, Yale Vision allows student submission of photogrammetry spaces on the web, with full desktop, mobile, and gamepad navigation. Physics are enabled through pre-processing of spaces and adding in physics collision boxes.
</p>


<div align="center">

[Features](#features) •
[Development](#development) •
[Configuration](#configuration)

</div>
 
<div align="center" style="display: flex; flex-direction: row; justify-content: center; align-items: center; width: 100%;">
<img width="70%" alt="image" src="https://github.com/evankirkiles/cpsc419-yale-universed/assets/30581915/005bdbfa-9024-4a9e-89b5-73c86eaf4792">
<img width="28.5%" alt="image" src="https://github.com/evankirkiles/cpsc419-yale-universed/assets/30581915/0d32bcd5-0ece-4162-addb-3bbf3b54a292">
</div>


## Changelog

MVP (March 10): Set up infrastructure for website, built style guide, created basic space to demonstrate capabilities. Space can be played at https://cpsc419-yale-universed.vercel.app/spaces/test.

## Features

Todo.

| Feature | Description |
| --- |--- |
| | |

## Development

To develop locally, clone this repository and hook it into the Supabase backend by setting your environment variables in `.env.local`.

```bash
# clone the repository to your machine
git clone git@github.com:evankirkiles/cpsc419-yale-universed.git
cd cpsc419-yale-universed/
# install dependencies and begin the local web server
pnpm i
pnpm dev
```
