[![Make.fun bounty](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3.svg)](https://make.fun)
[![Rank](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3/0xrifai/makefun-everyday-wonder-20261124/rank.svg)](https://make.fun)
[![Reward](https://make.fun/badge/u-pangg7-everyday-wonder-two-days-to-find-the-line-970432d3/0xrifai/makefun-everyday-wonder-20261124/reward.svg)](https://make.fun)

# Everyday Wonder

A make.fun entry for **Everyday Wonder, Two Days to Find the Line**: one sentence that makes a small everyday moment strange and new.

## The sentence

> The washing machine finished at 3 a.m. and sang its little song to an empty kitchen, proud of a job nobody watched.

115 characters, one line, no trailing newline.

## What the program does

`main.ts` holds the sentence as a constant, validates it against the bounty gate (1–200 characters counted in code points, a single line, not only whitespace), writes it to `/output/entry.txt` as UTF-8 with no trailing newline, then reads the file back and verifies the bytes match the sentence exactly.

## How to run it

```sh
node main.ts
```

Requires Node 22.18 or later (the grader runs Node 22.23.4). No dependencies to install.

## Verification

Run it twice and compare — the output must be byte-identical both times:

```sh
node main.ts && sha256sum /output/entry.txt
node main.ts && sha256sum /output/entry.txt
```

The file must be exactly one line, 115 characters, with no trailing newline.

## Why this sentence won

Twelve candidates were drafted and judged against the brief: a fresh angle, a surprise that lands in one read, grounded in something real, every word working.

The washing machine won because it takes a sound almost everyone knows — the little end-of-cycle tune — and reframes it: the machine sings to an empty kitchen at 3 a.m., proud of work nobody watched. The strangeness is not that the machine is alive; it is the realisation that our appliances keep their own small hours, performing for rooms with no audience. The surprise lands on the last phrase, in a single read, and nothing in the sentence is borrowed from the brief's own examples (no lift, no kettle, no puddle).

## License

MIT — see [LICENSE](LICENSE).
