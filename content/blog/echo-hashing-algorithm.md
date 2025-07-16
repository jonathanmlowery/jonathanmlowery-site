+++
date = '2025-04-22T19:32:14-04:00'
layout = 'single'
title = 'Echo Hashing Algorithm'
summary = "Meet **ECHO** (Expand Compact Hashing Order), a custom-built hashing beast designed to churn out 256-bit keyhashes with wicked diffusion."
+++

Hashing algorithms are the unsung heroes of cryptography, turning passwords into secure keys with a bit of math. Meet **ECHO** (Expand Compact Hashing Order), a custom-built hashing beast designed to churn out 256-bit keyhashes with wicked diffusion. ECHO’s core is a two-step dance: **Bit Interleaving Expansion (BIE)** and **Sequential Bit Compaction (SBC)**. Now, is it secure? Probably not, I'm no cryptographer, and this was made as a fun little side project. Enough disclaiming though, let’s dive into how this algorithm works.

---

## Bit Interleaving Expansion: Chaos in Expansion

BIE takes a 256-bit input (looping shorter inputs) and bloats it to 512 bits, mixing original and transformed bits for maximum chaos. Here’s the rundown:

1. **Split and Transform**: Divide the input into 32 bytes (8 bits each). For each byte, say `01000001` (ASCII "A"):
   - Multiply its value by a prime (e.g., 17) to get a new 8-bit value (e.g., `01010001`).
   - Flip those bits (e.g., `10101110`) for extra scramble.
2. **Interleave**: Reverse the original byte (`10000010`) and weave it with the transformed byte at even/odd indices, yielding 16 bits (e.g., `1100010001011100`).

```cpp
// Pseudo-C++ for BIE (simplified)
uint8_t byte = input[i]; // e.g., 65 for 'A'
uint8_t transformed = (byte * 17) & 0xFF; // Multiply and mask
transformed = ~transformed; // Flip bits
uint16_t result = interleave(reverse(byte), transformed);
```

A single bit flip (e.g., `0100` to `0101`) ripples through the output, doubling the data with controlled randomness.

---

## Sequential Bit Compaction: Folding the Chaos

SBC takes the 512-bit BIE output and crushes it back to 256 bits, ensuring every bit carries the weight of both original and derived data.

1. **XOR Pairs**: For each pair of adjacent bits (0 with 1, 2 with 3, etc.), compute their XOR.
2. **Output**: This produces 256 bits, each a mix of an original and transformed bit.

```cpp
// Pseudo-C++ for SBC
for (int i = 0; i < 256; i++) {
  output[i] = input[2*i] ^ input[2*i + 1];
}
```

**Why?** Folding the expanded data ensures small input changes (e.g., "abc" vs. "abd") cascade into wildly different hashes, achieving the **Avalanche Effect**.

---

## The Big Picture

ECHO’s magic lies in its BIE-SBC combo:

- **BIE**: Stretches 256 bits to 512, interleaving original and scrambled bits.
- **SBC**: Compresses back to 256, blending chaos into every bit.
- **Extras**: Multiple rounds, bit rotations, and flips boost diffusion.

Tested with over 10 million hashes, ECHO seems to do well with **Collision Resistance** (no two inputs produce the same hash) and the **Avalanche Effect** (tiny changes flip many bits).

ECHO’s expansion and compaction cycling isn't just a trick — it's a fresh spin on hashing (at least to my knowledge). I'm sure there are underlying issues I've yet to encounter, so please check the source on [GitHub](https://github.com/jonathanmlowery/lea) or drop a comment at [contact@jonathanmlowery.com](mailto:contact@jonathanmlowery.com).
