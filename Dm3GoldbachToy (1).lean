import Mathlib.Data.Nat.Basic
import Mathlib.Init.Function

/-!
# Toy Goldbach pillar (dm³, fully verified)

Finite, entropy-complete toy for the Goldbach grammar.
Mirrors the Poincaré and Collatz toy pillars exactly.

State: a natural number (the "even size" to compress toward 0).
Flow: C_goldbach = pred (subtract 1, floor at 0).
Attractor: ⟨0⟩ (the minimal even base).
Convergence: every state reaches ⟨0⟩ in exactly X.value steps.
Entropy chain: M/E detect exactly the attractor.

sorry_count: 0
-/

namespace Dm3GoldbachToy

/-- Toy Goldbach state: an even natural number (the "size" to compress). -/
structure GoldbachState where
  value : ℕ
  deriving DecidableEq

/-- Canonical attractor: the minimal even base (4 in the real Goldbach, 0 in this toy). -/
def attractor : GoldbachState := ⟨0⟩

/-- Simply-connected predicate (toy version: always true). -/
def isSimplyConnected (_X : GoldbachState) : Prop := True

/-- dm³ operator grammar. -/
inductive Dm3Op
  | C | K | F | U
  deriving DecidableEq, Repr

open Dm3Op

/-- TOGT composite operator: U ∘ F ∘ K ∘ C. -/
def G {α} (C K F U : α → α) : α → α := U ∘ F ∘ K ∘ C

/-- C_goldbach: compression — subtract 1 (Nat.pred), floor at 0.
    Toy analogue of: compress even n toward the minimal even base. -/
def C_goldbach (X : GoldbachState) : GoldbachState := ⟨X.value.pred⟩

/-- K_goldbach: curvature — identity in this toy model. -/
def K_goldbach (X : GoldbachState) : GoldbachState := X

/-- F_goldbach: folding — identity in this toy model. -/
def F_goldbach (X : GoldbachState) : GoldbachState := X

/-- U_goldbach: unfolding — identity in this toy model. -/
def U_goldbach (X : GoldbachState) : GoldbachState := X

/-- One step of toy Goldbach flow: C_goldbach (pred on value). -/
def goldbachStep (X : GoldbachState) : GoldbachState := C_goldbach X

/-- goldbachStep factors as G C K F U. Proved by rfl. -/
theorem goldbach_operatorDecomposition :
    ∀ X, goldbachStep X = (G C_goldbach K_goldbach F_goldbach U_goldbach) X :=
  fun _ => rfl

/-! ## Core iteration lemma -/

/-- Iterating goldbachStep n times subtracts n from value (floored at 0). -/
lemma iterate_goldbachStep_value (X : GoldbachState) (n : ℕ) :
    (goldbachStep^[n] X).value = X.value - n := by
  induction n generalizing X with
  | zero => simp [Function.iterate_zero, Nat.sub_zero]
  | succ n ih =>
    rw [Function.iterate_succ', Function.comp]
    simp only [goldbachStep, C_goldbach]
    rw [ih ⟨X.value.pred⟩]
    simp [Nat.pred_eq_sub_one, Nat.sub_succ]

/-- After exactly X.value steps, every state reaches the attractor. -/
lemma iterate_to_attractor (X : GoldbachState) :
    goldbachStep^[X.value] X = attractor := by
  apply GoldbachState.ext
  simp only [attractor]
  rw [iterate_goldbachStep_value]
  exact Nat.sub_self X.value

/-! ## Main convergence theorem -/

/-- **Toy Goldbach convergence.**
    Every simply-connected GoldbachState flows to the attractor. -/
theorem goldbach_converges
    (X : GoldbachState) (_hX : isSimplyConnected X) :
    ∃ n : ℕ, goldbachStep^[n] X = attractor :=
  ⟨X.value, iterate_to_attractor X⟩

/-! ## Entropy chain (M and E) -/

/-- M_goldbach: entropic boundary — true when the flow has reached closure. -/
def M_goldbach (X : GoldbachState) : Prop := X.value = 0

/-- E_goldbach: stability detector — true when X is the attractor. -/
def E_goldbach (X : GoldbachState) : Prop := X = attractor

/-- E_goldbach detects exactly value = 0. -/
theorem E_goldbach_iff_value_zero (X : GoldbachState) :
    E_goldbach X ↔ X.value = 0 := by
  simp [E_goldbach, attractor, GoldbachState.ext_iff]

/-- M_goldbach and E_goldbach coincide. -/
theorem M_goldbach_iff_E_goldbach (X : GoldbachState) :
    M_goldbach X ↔ E_goldbach X := by
  simp [M_goldbach, E_goldbach_iff_value_zero]

/-- Entropy monotonicity: value strictly decreases until M_goldbach. -/
theorem entropy_monotone (X : GoldbachState) (h : ¬ M_goldbach X) :
    (goldbachStep X).value < X.value := by
  simp only [goldbachStep, C_goldbach, M_goldbach] at *
  rw [Nat.pred_eq_sub_one]
  omega

/-! ## Sanity checks -/

example : goldbachStep^[6] ⟨6⟩ = attractor := iterate_to_attractor ⟨6⟩
example : goldbachStep^[0] ⟨0⟩ = attractor := iterate_to_attractor ⟨0⟩

end Dm3GoldbachToy
