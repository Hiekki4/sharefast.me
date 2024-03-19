<p align="center">
  <a href="https://github.com/hiekki4/sharefast">
   <img src="/public/background.png" alt="Logo">
  </a>
</p>

<p align="center">
  <a href="https://go.shfst.me/x">
    <img alt="X" src="https://img.shields.io/twitter/follow/sharefilesfast?style=flat&label=%40sharefilesfast&logo=twitter&color=0bf&logoColor=fff">
  </a>
  
  <a href="https://go.shfst.me/community">
    <img alt="Discord" src="https://img.shields.io/discord/756656735464325210">
  </a>

  <a href="https://go.shfst.me/license">
    <img src="https://img.shields.io/github/license/hiekki4/sharefast.me?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

## Introduction

ShareFast is a simple file sharing service that allows you to upload files and share them with others. The files are stored for a limited time and are deleted after a certain period of time. The service is designed to be fast and easy to use, with a focus on simplicity and speed.

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Tailwind](https://tailwindcss.com/) – CSS
- [Upstash](https://upstash.com/) – redis
- [Vercel](https://vercel.com/) – deployments
- [Storj](https://storj.io/) – file storage
- [Neon](https://neon.tech/) – database

## Development

1. Clone the repository

```bash
git clone https://github.com/hiekki4/sharefast.me.git
```

2. Install dependencies

```bash
npm install
```

3. Generate prisma client

```bash
npx prisma generate
```

4. Create database tables

```bash
npx prisma db push
```

5. Start the development server

```bash
npm run dev
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## Activity

![Activity](https://repobeats.axiom.co/api/embed/446ff580911c57b49e2049c8722604ca2ecf07dd.svg "Repobeats analytics image")

## License

Distributed under the GNU Affero General Public License Version 3 (AGPLv3). See `LICENSE` for more information.
