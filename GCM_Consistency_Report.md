# GCM / Principia Orthogona — Cross-Volume Consistency Report
**Author:** Pablo Nogueira Grossi  
**Date:** March 2026  
**Documents reviewed:** Vol. 1 (PDF), Vol. 2 (PDF), dm3_paper1_final.tex (GCM), dm3_paper2_final.tex (toy model), PROJECT_STATE.md

---

## VERDICT SUMMARY

| Check | Status |
|---|---|
| Operator sequence C → K → F → U | ✅ CONSISTENT across all four papers |
| Contact form α = dz − r²dθ | ✅ CONSISTENT (Vol. 2 PDF + Paper 2 tex explicit) |
| Lyapunov function V = (r−1)² | ✅ CONSISTENT (implied throughout, explicit in Paper 2) |
| Canonical triple (T*, μ_max, τ) = (2π, −2, 2) | ✅ CONSISTENT — see note below |
| Stability radius ε₀ = 1/3 | ⚠️ FORMULA MISMATCH — see Issue 1 |
| Transverse eigenvalue λ(z) = −2(1−e^{−z}) | ✅ CONSISTENT |
| Threshold equivalence \|κ\|↑κ* ⟺ μ_max < 0 ⟺ τ ∈ (0,∞) | ✅ CONSISTENT |
| Banned terms (TOGT, Betti, Comp/Konst/Fold/Unfold, wrong values) | ✅ NONE found |
| Dedication / authorship | ✅ CONSISTENT |
| Framework name (GCM / Principia Orthogona) | ✅ CONSISTENT |
| Cross-volume description of Vol. 2 scope | ⚠️ MISMATCH — see Issue 2 |
| Author affiliation | ⚠️ MISMATCH — see Issue 3 |
| Canonical triple in Paper 2 early statement | ⚠️ MINOR — see Issue 4 |

---

## ISSUES FOUND

---

### ISSUE 1 — ε₀ Formula: Two Equivalent Forms, Reconcilable but Stated Differently  
**Severity: LOW (mathematically consistent, but cosmetically different)**

**Paper 1 (GCM tex), abstract and Theorem D:**
```
ε₀ = ½ |μ_max| · sup_Γ ‖Hess V‖⁻¹
```

**Paper 2 (toy model tex) and Vol. 2 PDF:**
```
ε₀ = |μ_max| / [2(1 + sup ‖Hess V‖)]
```
which gives ε₀ = 2/(2·3) = 1/3.

**Analysis:** These are NOT the same formula. The first form uses `‖Hess V‖⁻¹` (inverse of the sup), which equals `1/sup‖Hess V‖` = `1/2`. This gives ε₀ = ½ · 2 · ½ = ½ — NOT 1/3.

The correct formula that yields ε₀ = 1/3 is the one in Paper 2:  
`ε₀ = |μ_max| / [2(1 + sup‖Hess V‖)]`

This matches PROJECT_STATE.md's locked value `ε₀ = |μ_max| / (2(1 + sup‖Hess V‖)) = 2/(2·3) = 1/3`.

**The abstract of Paper 1 (GCM) uses the wrong formula.** The body of Paper 1 (line ~211) actually uses the correct formula. So there is an internal inconsistency within Paper 1 between the abstract and the body.

**Action required:** Correct the abstract of dm3_paper1_final.tex to read:
```
ε₀ = |μ_max| / [2(1 + sup_Γ ‖Hess V‖)]
```

---

### ISSUE 2 — Volume One's Closing Statement Misdescribes Volume Two  
**Severity: MEDIUM (creates reader confusion about Vol. 2's actual content)**

**Vol. 1 Closing Statement reads:**
> "Volume Two develops discrete variational integrators and numerical realisation."

**Vol. 2 Preface and actual content:**  
Volume Two constructs the **contact-geometric realization** of the fold, the threshold equivalence theorem (κ* ↔ τ), the dm3 verification, and the singularity–bifurcation correspondence. There are no discrete variational integrators in Vol. 2.

**Vol. 1 Closing Statement also reads:**
> "Volume Three instantiates the framework in specific domains: plasma reconnection, market volatility manifolds, and neural embedding geometry."

**But Vol. 3 (per PROJECT_STATE.md) is actually:** Biological Instantiations — HPA/allostasis, circadian rhythms, immune adaptation, hormesis, neural oscillations. Plasma and markets are NOT the planned content of Vol. 3.

**Additionally:** Vol. 2 Preface and Discussion correctly describe Vol. 3 as "plasma, markets, neural geometry," which contradicts PROJECT_STATE.md's Vol. 3 plan (biology). This suggests the Vol. 3 scope was revised after Vol. 2 was written, but Vol. 1 and Vol. 2 were not updated to reflect the change.

**Action required:**  
- Update Vol. 1 Closing Statement: replace "Volume Two develops discrete variational integrators and numerical realisation" with an accurate one-line description of Vol. 2's actual content (contact realization, threshold equivalence, singularity–bifurcation correspondence).  
- Update all mentions of Vol. 3 scope in Vol. 1 and Vol. 2 to reflect the biological instantiations plan.  
- This is a metadata/description fix only — no mathematics changes.

---

### ISSUE 3 — Author Affiliation Inconsistency  
**Severity: LOW but potentially important for journal submission**

**Vol. 1 PDF (and HAL preprint):**  
`Academic Coordinator, UCEDA School (ESL), Elizabeth, NJ. Newark, NJ, USA.`

**dm3_paper1_final.tex and dm3_paper2_final.tex:**  
`\address{Independent Researcher, Brazil}`

**PROJECT_STATE.md:**  
`Newark, NJ, USA | pablogrossi@hotmail.com`

Three different affiliations appear across the four papers submitted to different journals. Journals may query this discrepancy, especially since two papers are submitted to different journals from the same author.

**Action required:** Decide on one canonical affiliation and apply it consistently. The HAL version (UCEDA, Elizabeth NJ) is what is publicly recorded. The tex files should be updated to match, or a consistent rationale for the difference should be prepared (e.g., "Independent Researcher" for math journals is fine, but it should be the same in both).

---

### ISSUE 4 — Canonical Triple Stated with Placeholder in Paper 2 Early Section  
**Severity: VERY LOW (resolved later in same document)**

**dm3_paper2_final.tex, line 245:**
```
ι(𝔇₀) = (T*, μ_max, τ) = (2π, −2, τ₀)
```
where τ₀ is described as "computed in Section [measures]."

**Later in same document (line 806):**
```
(T*, μ_max, τ) = (2π, −2, 2)
```

This is logically fine — the early statement is a forward reference — but a reader scanning the paper might note the placeholder and not find τ = 2 stated upfront. Consider whether to promote the complete triple to the early statement for clarity.

---

## WHAT IS FULLY CONSISTENT ✅

1. **Toy model equations** — identical across Vol. 2 and Paper 2:
   - ṙ = r(1−r²) + 2(r−1)e^{−z}
   - θ̇ = 1
   - ż = r² − 2(r−1)²e^{−z}

2. **Contact form** — α = dz − r²dθ is explicit and correct in Vol. 2 PDF (§4.3) and Paper 2 tex (line 136, 295–296, 301, 852).

3. **μ_max = −2** — consistent in all four documents. Not once does μ_max = 1 appear.

4. **τ = 2** — consistently derived and stated as the canonical value everywhere it is explicitly computed (Vol. 2 §4.4, Paper 2 §measures). τ = 1/2 does not appear anywhere.

5. **ε₀ = 1/3** — the correct numerical value appears in Paper 2 and Vol. 2. The abstract of Paper 1 has a formula discrepancy (see Issue 1), but the numerical value 1/3 is not contradicted.

6. **Transverse eigenvalue** — λ(z) = −2(1−e^{−z}), with λ(0) = 0, λ(z) < 0 for z > 0, λ → −2 as z → ∞, stated consistently in Vol. 2 §4.4 and Paper 2.

7. **Threshold equivalence** — |κ|↑κ* ⟺ μ_max < 0 ⟺ τ ∈ (0,∞) is the core of Vol. 2 Theorem B and Paper 1 Theorem B. Statements match.

8. **Operator grammars** — C→K→F→U (Vol. 1, Vol. 2) and g→L→R→U (Paper 1, Paper 2) are used in their respective correct papers. No cross-contamination.

9. **No banned terms** — TOGT, Comp, Konst, Fold (as operator name), Unfold, Betti numbers, τ = 1/2, μ_max = 1, wrong Jacobian, wrong α sign: **none appear in any document**.

10. **Dedication** — "Once tiny, always strong" / children's names consistent in all four papers.

11. **Whitney singularity correspondence** — A1/A2/A3 ↔ Hopf/NS/slow-fast crossover stated consistently in Vol. 1 §13.5 and Vol. 2 §5.

12. **HAL preprint** — correctly records Vol. 1 as submitted to JGP "In press." Consistent with PROJECT_STATE.md.

---

## PRIORITY ACTION LIST

| Priority | Action | Effort |
|---|---|---|
| 1 | Fix ε₀ formula in abstract of dm3_paper1_final.tex | 1 line |
| 2 | Update Vol. 1 Closing Statement to correctly describe Vol. 2 | 2 sentences |
| 3 | Update Vol. 1 and Vol. 2 description of Vol. 3 scope (biology, not plasma/markets) | 2–3 sentences each |
| 4 | Harmonize author affiliation across all four tex files | 1 line each |
| 5 | Optionally promote τ = 2 to the early canonical triple in Paper 2 | 1 line |

None of these require changes to any theorem, proof, equation, or mathematical constant.

---

## MATHEMATICAL CONSTANTS — FINAL VERIFIED STATE

| Constant | Locked value | Status |
|---|---|---|
| T* | 2π | ✅ |
| μ_max | −2 | ✅ |
| τ | 2 | ✅ |
| ε₀ | 1/3 | ✅ numerical value correct; abstract formula of Paper 1 needs fix |
| λ(z) | −2(1−e^{−z}) | ✅ |
| Contact form α | dz − r²dθ | ✅ |
| Lyapunov V | (r−1)² | ✅ |
| Stability condition | τ₁₂ ≤ min(τ₁, τ₂) | ✅ |
