# Blade

Free, open-source developer tools that run in the browser. Next.js (App Router), React 19, Tailwind v4, shadcn/ui, Biome.

- `pnpm dev` / `pnpm build`
- `pnpm lint` (Biome check) / `pnpm format`

## Code architecture

Each tool is a feature under `src/features/<feature>/`. Routes in `src/app/` stay thin: they render the feature's entry and set metadata.

```
src/features/<feature>/
  index.tsx                   # feature entry, composes components
  components/<component>/
    Component.tsx             # view: markup + wiring handlers to the UI
    usecase/use-view.ts       # logic for this component only
  usecase/                    # logic shared by several components of the feature
  repository/                 # server fetching + normalizers (see below)
  models/                     # domain types used by usecase and views
  utils/                      # pure helpers, no React, no I/O
  context/                    # React context, when state spans many components
```

`src/features/url-builder` is the reference example.

### 1. Business logic goes in `usecase/`, views stay views

- A component renders and wires events. Its state, effects, handlers and derived values live in a hook in `usecase/` (for example `usecase/use-view.ts`), and the component calls that hook.
- Put the hook next to the component (`components/<component>/usecase/`) when only that component uses it. Put it in the feature-level `usecase/` when several components share it.
- **Exception: simple logic.** If a component's logic is roughly 10 lines or fewer (a `useState` toggle, a one-line handler, a small derived value), keep it in the component. Don't create a usecase file for it.
- Usecase hooks return plain state and named handlers (`handleX`). They don't return JSX.

### 2. Server fetching goes in `repository/`

When a feature needs data from a server:

- `repository/` owns the transport: the REST, GraphQL or SDK call, the client library, endpoints, headers, and error mapping.
- Each repository function normalizes the backend response into a domain model from `models/` before returning it. Keep the normalizers next to the calls (for example `repository/normalize-<thing>.ts`). Raw response shapes never leave `repository/`.
- Usecases call repository functions and only work with the normalized models.
- Components never import from `repository/`, and usecases never call `fetch`, a GraphQL client or an HTTP library directly.

**Why:** if the backend moves from REST to GraphQL, the response shape changes, or the fetching library is swapped, only `repository/` changes. Usecase logic and views stay the same.

### Shared, app-wide code

- `src/components/ui/`: shadcn primitives. `src/components/composition/`: app-level composed components (navbar, footer, tooltip, alert).
- New tool pages start with `ToolHeader` (back button, title, description). Reuse `CopyField` for a labelled value with a copy button, and `Segmented` for small mode toggles. Copy to the clipboard with `copyText` from `src/lib/clipboard.ts` (it shows the toast).
- A new tool also needs an entry (with a Material icon) in `src/features/tools/index.tsx` and a route at `src/app/tools/<tool>/page.tsx`.
- `src/hooks/`: hooks used by more than one feature (for example `use-local-storage-list`).
- `src/constants/storage-keys.ts`: every localStorage key, namespaced `blade:<feature>:<data>`. Add new keys there; never hard-code a key in a feature.
- `src/utils/`: pure helpers used by more than one feature.
- Icons: Material icons from `react-icons/md` for card and content icons (tool cards, value type). `lucide-react` for buttons and controls (the shadcn default).
