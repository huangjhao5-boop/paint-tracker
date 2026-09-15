---
name: project-meeting-logs
description: >
  Universal engineering decision-making and meeting log protocol for AI Coding
  Agents. Enforces structured technical evaluation, trade-off analysis, algorithm
  design documentation, and persistent project meeting records (PROJECT_MEETING_LOGS.md).
  Can be used in any software repository, team, or agentic workflow (AI Studio, Claude Code, Cursor, Copilot).
---

# Universal Project Meeting Records & Engineering Decision Workflow (專案研討開會紀錄與工程決策規範)

This skill provides a standardized, professional engineering governance framework for AI Coding Agents when collaborating with users, tech leads, or product managers on any software project.

---

## 🎯 Purpose & Applicability (適用場景)

Use this skill whenever:
1. The user raises a **new feature proposal, architectural shift, or technical change**.
2. Trade-offs between multiple implementation strategies need to be objectively analyzed (feasibility, constraints, user experience, performance).
3. The project requires a **permanent, auditable audit trail of technical decisions (ADR / Meeting Records)** maintained in the codebase.
4. The user or project rules mandate structured meeting minutes before or after major milestone deliveries.

---

## 🏛️ Core Workflow (核心工作流程)

Whenever a significant discussion, inquiry, or feature iteration occurs:

### Step 1: Technical & Pragmatic Evaluation (議題討論與客觀評估)
Do NOT simply say "Sure, I will do it." Instead, analyze:
- **Feasibility & Constraints**: Physical, hardware, browser, mobile, or runtime limitations.
- **Trade-off Matrix**: Compare the proposed approach vs. alternative approaches (Speed, Reliability, Maintenance, UX).
- **Domain Edge Cases**: Real-world user contexts (e.g., offline environments, sensor limits, camera distortion).

### Step 2: Algorithmic & Architectural Formulation (演算法與架構推導)
- Document the exact mathematical formulas, data structures, or state-machine designs being adopted.
- Formulate step-by-step pseudo-code or pipeline stages (e.g., Input -> Sampling -> Transform -> Optimization -> Output).

### Step 3: Meeting Record Generation (標準開會紀錄產出)
Append or maintain a versioned entry in `PROJECT_MEETING_LOGS.md` at the project root using the standard schema below.

### Step 4: Synchronous Code Delivery & Verification (落實交付與驗證)
- Implement the decided solution cleanly.
- Verify through automated builds or test suites.
- Mark the action items in the meeting log as completed.

---

## 📝 Standard Meeting Log Schema (會議紀錄標準範本)

When logging to `PROJECT_MEETING_LOGS.md`, always adhere strictly to this Markdown template:

```markdown
## 📅 會議編號：MTG-YYYYMMDD-XX
- **會議時間**：YYYY-MM-DD HH:mm (時區 / 當前時間)
- **與會人員**：使用者 (Project Owner / Lead), AI Coding Agent
- **會議主題**：[簡潔明瞭的主題描述]

### 📋 議題討論與評估

#### 議題 [序號]：[議題名稱，如：掃描 vs 手動辨識評估]
- **討論重點**：[核心疑問或需求背景]
- **實務評估分析**：
  1. **限制與挑戰**：[硬體、環境、資料結構限制]
  2. **方案對比**：[方案 A 與 方案 B 之優缺點比較]
  3. **實務可行性結論**：[最終評定可行 / 暫緩 / 替代方案]
- **會議決議**：[明確的決策結論]

### ⚙️ 演算法與架構設計 (若涉及核心演算)
- **數學公式 / 模型**：
  $$\text{Target} = f(\text{Input})$$
- **執行管線流程**：
  1. 步驟一：...
  2. 步驟二：...

### 📌 待辦事項與指派 (Action Items)
1. [ ] 或 [x] 具體任務項目 1
2. [ ] 或 [x] 具體任務項目 2
```

---

## 💡 Best Practices for Agents (Agent 行為原則)

1. **Be Truthful & Objective**: If a user's proposed approach has significant technical flaws (e.g., scanning tiny curved glossy bottles in low light), politely and clearly explain the physical constraints with facts, and propose a superior, practical alternative.
2. **Persistence Guarantee**: Always persist logs in `PROJECT_MEETING_LOGS.md` in the workspace, so subsequent agent sessions or human collaborators can review the historical context.
3. **Keep Action Items Trackable**: Mark completed tasks with `[x]` and pending tasks with `[ ]`.
