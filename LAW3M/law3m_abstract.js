const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  BorderStyle, UnderlineType, Tab, TabStopType, TabStopPosition,
  Table, TableRow, TableCell, WidthType, ShadingType, VerticalAlign
} = require('docx');
const fs = require('fs');

// ── helpers ─────────────────────────────────────────────────────────────────
const tnr  = (text, opts={}) => new TextRun({ text, font:"Times New Roman", size:24, ...opts });
const tnrB = (text, opts={}) => tnr(text, { bold:true, ...opts });
const tnrI = (text, opts={}) => tnr(text, { italics:true, ...opts });
const tnrSup = (text) => new TextRun({ text, font:"Times New Roman", size:20, superScript:true });

const para = (children, opts={}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { line:240, lineRule:"auto", before:0, after:0 },
  ...opts,
  children: Array.isArray(children) ? children : [children]
});

const blank = () => new Paragraph({ spacing:{ line:120, before:0, after:0 }, children:[] });

// ── EPISTEMIC TABLE ──────────────────────────────────────────────────────────
const cell = (text, fill="FFFFFF", bold=false) => new TableCell({
  width:{ size:2880, type:WidthType.DXA },
  borders:{
    top:{ style:BorderStyle.SINGLE, size:4, color:"333333" },
    bottom:{ style:BorderStyle.SINGLE, size:4, color:"333333" },
    left:{ style:BorderStyle.SINGLE, size:4, color:"333333" },
    right:{ style:BorderStyle.SINGLE, size:4, color:"333333" },
  },
  shading:{ fill, type:ShadingType.CLEAR },
  margins:{ top:40, bottom:40, left:80, right:80 },
  children:[new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing:{ line:220, before:0, after:0 },
    children:[new TextRun({ text, font:"Times New Roman", size:18, bold })]
  })]
});

const epistemicTable = new Table({
  width:{ size:8640, type:WidthType.DXA },
  columnWidths:[2880,2880,2880],
  rows:[
    new TableRow({ children:[
      cell("PROVED","D0E8D0",true),
      cell("COMPUTED","D0D8F0",true),
      cell("CONJECTURAL","F0E8C0",true)
    ]}),
    new TableRow({ children:[
      cell("C→K→F→U operator algebra; [K,F]≠0 at fold point (Whitney A₁); OFF-lock P_ON=0","D0E8D0"),
      cell("dm³ parameters: μ_max=−2, ε₀=1/3, τ=2π, κ*≈0.882; Hill coefficient n≈3.64; DNLS solitons","D0D8F0"),
      cell("C→K→F→U ↔ Kitaev bond operators; g⁶≈33 gateway; OTOC↔TOGT complementarity","F0E8C0")
    ]})
  ]
});

// ── DOCUMENT ─────────────────────────────────────────────────────────────────
const doc = new Document({
  sections:[{
    properties:{
      page:{
        size:{ width:11906, height:16838 },  // A4
        margin:{ top:1134, right:1134, bottom:1134, left:1134 } // ~2cm margins
      }
    },
    children:[

      // TITLE
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:240, before:0, after:80 },
        children:[
          new TextRun({
            text:"Topographical Orthogenetics of Fermion Fractionalization and Non-Abelian Anyon Emergence in Frustrated Magnetic Manifolds",
            font:"Times New Roman", size:26, bold:true
          })
        ]
      }),

      // AUTHORS
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:240, before:80, after:40 },
        children:[
          new TextRun({ text:"Pablo Nogueira Grossi", font:"Times New Roman", size:24,
            underline:{ type:UnderlineType.SINGLE } }),
        ]
      }),

      // AFFILIATION
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:220, before:0, after:80 },
        children:[
          tnrI("G6 LLC, Newark, New Jersey, USA | ORCID: 0009-0000-6496-2186"),
        ]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:220, before:0, after:100 },
        children:[
          tnrI("Principia Orthogona Series — DOI: 10.5281/zenodo.19117399"),
        ]
      }),

      // ABSTRACT BODY
      para([
        tnrB("Introduction. "),
        tnr("Frustrated magnetic systems — particularly the Kitaev honeycomb model — remain central to understanding quantum spin liquids, fermion fractionalization, and non-Abelian anyons essential for topological quantum computation [1,2]. Open challenges persist: deterministic selection of degenerate ground states, robust nucleation of non-Abelian Ising anyons under magnetic fields Φ, and the microscopic generative rules governing topological phase transitions. We introduce "),
        tnrB("Topographical Orthogenetics (TO/TOGT)"),
        tnr(" — a substrate-independent generative framework — as a structural complement to the statistical OTOC probes recently demonstrated on Google's Willow processor [3]."),
      ]),

      blank(),

      para([
        tnrB("The C→K→F→U Operator Framework. "),
        tnr("Configuration spaces are modelled as curved topographical manifolds. The recursive operator cycle "),
        tnrI("G = U∘F∘K∘C"),
        tnr(" drives deterministic reconfigurations: "),
        tnrB("C"),
        tnr(" (Compression) orthogonally projects spin degrees of freedom to effective fermionic representations, preserving the Z"),
        tnrSup("2"),
        tnr(" gauge constraint and stability bound μ"),
        tnrSup("max"),
        tnr(" = −2; "),
        tnrB("K"),
        tnr(" (Knitting, threshold κ* ≈ 0.882) entangles compressed elements into coherent Majorana pairs — the analogue of the Jordan-Wigner transformation σ"),
        tnrSup("α"),
        tnr("ᵢ = ib"),
        tnrSup("α"),
        tnr("ᵢcᵢ; "),
        tnrB("F"),
        tnr(" (Folding) binds non-Abelian anyons at flux vortices via a Whitney A"),
        tnrSup("1"),
        tnr(" potential V(η;κ) = η³/3 − (κ−κ*)η; "),
        tnrB("U"),
        tnr(" (Unfolding) selects stable anyonic attractors under Φ-bias. See Fig. 1."),
      ]),

      blank(),

      para([
        tnrB("Proved results. "),
        tnr("(i) "),
        tnrB("Non-commutativity [K,F]≠0:"),
        tnr(" treating K as multiplication by θ(η*−η) and F as the Nemytskii operator Fψ = ψ + λ|ψ|²ψ on L²([0,1]), the commutator in D′([0,1]) acquires a boundary term localised at the fold point η*:"),
      ]),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:240, before:60, after:60 },
        children:[
          tnrI("[K,F]ψ = −λ|ψ(η*)|²ψ(η*) δ(η−η*) ≠ 0")
        ]
      }),

      para([
        tnr("(ii) "),
        tnrB("OFF-lock (C→K→F→U):"),
        tnr(" K projects all amplitude to η < η* before F fires, so F cannot generate ON-state support; P"),
        tnrSup("ON"),
        tnr(" = 0 exactly. (iii) "),
        tnrB("ON-permission (C→F→K→U):"),
        tnr(" F acts before projection, generating amplitude in η > η*, so P"),
        tnrSup("ON"),
        tnr(" > 0. Operator order therefore uniquely determines the outcome — proved by exhaustive case analysis on the support of ψ after each step."),
      ]),

      blank(),

      para([
        tnrB("Application to the Kitaev model (conjectural mapping). "),
        tnr("The C-step compresses spins into fermionic representations preserving bond-directional Kitaev interactions. K generates coherent Majorana pairing across the lattice (κ* governs onset). F binds Majorana zero modes to visons, forming non-Abelian Ising anyons. Under Φ-bias, U selects the gapped non-Abelian phase via threshold crossing at the g-level boundary. The g"),
        tnrSup("6"),
        tnr(" ≈ 33 node is conjectured as the Abelian→non-Abelian gateway."),
      ]),

      blank(),

      para([
        tnrB("OTOC complementarity and falsifiable prediction. "),
        tnr("OTOC scrambling stages correspond structurally to C→K→F→U: operator spreading (K), echo amplification (F), constructive interference plateau (U). A minimal falsifiable prediction follows from the dm³ curvature bound μ"),
        tnrSup("max"),
        tnr(" = −2: the OTOC(2) plateau onset on Kitaev material α-RuCl"),
        tnrSup("3"),
        tnr(" should occur at normalised field h/h"),
        tnrSup("c"),
        tnr(" ≈ κ*/η = 0.882/1.839 ≈ 0.480 ± 0.05. This is testable with current Willow-class processors or operando OTOC measurements."),
      ]),

      blank(),

      // EPISTEMIC TABLE
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:200, before:60, after:40 },
        children:[ tnrB("Table 1. Epistemic stratification of TO/TOGT claims.") ]
      }),
      epistemicTable,

      blank(),

      // FIGURE placeholder note (since we cannot embed actual figure programmatically without image file)
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:200, before:60, after:40 },
        borders:{ top:{style:BorderStyle.SINGLE,size:4,color:"999999"},
                  bottom:{style:BorderStyle.SINGLE,size:4,color:"999999"} },
        children:[
          tnrI("Fig. 1. C→K→F→U operator cycle on topographical manifold with Φ-bias inducing directed threshold crossings toward non-Abelian anyon attractors. [COMPUTED: cycle definitions; CONJECTURAL: Kitaev application]")
        ]
      }),

      blank(),

      // REFERENCES
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing:{ line:200, before:40, after:0 },
        children:[ tnrB("[1] "), tnr("Kitaev, A. Ann. Phys. 321, 2–111 (2006).  "),
                   tnrB("[2] "), tnr("Nayak et al. Rev. Mod. Phys. 80, 1083 (2008).  "),
                   tnrB("[3] "), tnr("Google Quantum AI. Nature 646, 825–830 (2025).") ]
      }),

      blank(),

      // FOOTER INFO
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:{ line:200, before:20, after:0 },
        children:[
          tnrI("Series DOI: 10.5281/zenodo.19117399 | Categories 1 & 9 | XIII LAW3M, Natal, Oct 19–23, 2026")
        ]
      }),

    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('/mnt/user-data/outputs/LAW3M_Grossi_2026_abstract.docx', buf);
  console.log('Done');
});
