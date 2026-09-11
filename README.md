# Vehicle Booking - Technical Assessment

Search vehicle availability and book one, built against the mock API in the brief.

## Running it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Nothing else to set up - no env vars, no DB, data lives in memory.

## Routes

- `/` - search + results
- `/book/[id]` - booking form
- `/confirmation/[bookingId]` - confirmation + cancel

## Approach

I implemented the mock API as real Next.js Route Handlers instead of faking it with a plain function, so the frontend is actually hitting `fetch()` and dealing with real status codes (400, 404, 409) rather than switching on hardcoded flags.

The conflict case is a genuine overlap check against existing bookings for that vehicle, not a random chance of failure. Booking the same car in two tabs for overlapping dates reliably produces the 409.

Every page is a Client Component. All of them are forms/mutations, so there's no real Server Component here - that's a deliberate call, not an oversight.

## Trade-offs

- There's no GET-single-vehicle endpoint in the contract, so vehicle details get passed through query params between routes instead of being re-fetched.
- In-memory store resets on restart - fine for this, wouldn't survive a real deployment.
- Validation is native `required` + the API's own 400s.

## Reuse at scale

`Button`, `Input`, `Select` live in `components/ui/` and are used everywhere instead of one-off styled elements. `lib/api.js` is the only place that talks to the API, so swapping the mock for a real backend later would only touch that one file.

## AI usage

Used Claude to plan and then scaffold the Route Handlers and the initial component shells, and to double-check current Next.js App Router conventions.

Also caught a bug where the booking cancellation route read `params.id` directly - in the Next.js version I'm on, `context.params` is a Promise in Route Handlers, so that would've either failed or grabbed the wrong id without an obvious error. Fixed by awaiting it before use.

Also used it to debug why the search flow worked in production but not on `next dev` when testing from my phone - turned out to be `localhost` binding to the machine only, not reachable from another device on the network.

Wrote the vehicle-availability overlap check in `data/store.js` and the form handling/validation in the search and booking forms and the other reusable compoenents, and did the mobile layout fixes by actually checking devtools at 375px rather than guessing.
