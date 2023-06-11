# QSTN Developer Code Test 2

![GitHub Actions](https://img.shields.io/github/actions/workflow/status/Garfield550/qstn-dct2/actions.yml?logo=github&style=for-the-badge)
![Vercel Deployment](https://img.shields.io/github/deployments/Garfield550/qstn-dct2/production?label=vercel&logo=vercel&style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/Garfield550/qstn-dct2?style=for-the-badge)
![License](https://img.shields.io/github/license/Garfield550/qstn-dct2?style=for-the-badge)

This is a [Next.js 13](https://nextjs.org/) project using new [App Route](https://nextjs.org/docs/app/building-your-application/routing) feature.

## Features

- New `/app` dir,
- Interaction with Aurora blockchain using **ConnectKit** and **Wagmi**
- Interaction with Near blockchain using **Near Wallet Selector** and **Near JavaScript API**
- Query Aurora Explorer data using **Apollo GraphQL**
- Server and Client Components
- API Routes and Middleware
- Authentication using **NextAuth.js**
- UI Components built using **shadcn/ui** and **Radix UI**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**

## Backlogs

- [ ] Reduce first load JS size for /dashboard page
- [ ] Performance optimizations
- [ ] Add more tests
- [ ] Interaction with [TestERC721](https://explorer.testnet.aurora.dev/address/0x1875fcC416a92e04Ee23d2077203B02f3a51D0C0/contracts#address-tabs) contract
- [ ] Interaction with Near Guest Book contract

## Known Issues

1. Hardcoded username(`johndoe`) and password(`abcd1234`)
1. Hardcoded user information
1. GitHub authentication not working
1. `/sign-in`, `/privacy` and `/terms` pages are not implemented

## Running Locally

1. Install dependencies using pnpm:

   ```sh
   pnpm install
   ```

1. Copy `example.env` to `.env.local` and update the variables.

   ```sh
   cp example.env .env.local
   ```

   > **Note**
   >
   > You can set `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` to `0x1875fcC416a92e04Ee23d2077203B02f3a51D0C0` and `NEXT_PUBLIC_NEAR_CONTRACT_ID` to `guest-book.testnet`

1. Start the development server:

   ```sh
   pnpm dev
   ```

## Running Tests

1. Install dependencies using pnpm:

   ```sh
   pnpm install
   ```

1. Copy `example.env` to `.env.test.local` and update the variables.

   ```sh
   cp example.env .env.test
   ```

1. Run tests:

   ```sh
   pnpm test
   ```

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Garfield550/qstn-dct2&project-name=qstn-dct2&repository-name=qstn-dct2)

The easiest way to deploy a Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

Licensed under the [MIT license](LICENSE).
