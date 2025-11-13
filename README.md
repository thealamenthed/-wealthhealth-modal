# @thealamenthed/wealthhealth-modal

A modern, reusable, and animation-ready React modal component built with Tailwind CSS.  
This modal was created for the HRnet refactor (Project 14 – OpenClassrooms) to replace the old `jquery modal` plugin with a clean and accessible React alternative.

---

## ✨ Features

- ✔ **ESC key closing**
- ✔ **Click outside (backdrop) closing**
- ✔ **Smooth transitions (scale + opacity)**
- ✔ **Blurred backdrop**
- ✔ **Centered dialog**
- ✔ **Tailwind-only styling (no external CSS)**
- ✔ **Custom title & custom content**
- ✔ **Accessible (`role="dialog"`, `aria-modal="true"`)**
- ✔ **Scroll lock when modal is open**

> ⚠ Note: This version does _not_ implement focus trap yet, to stay consistent with the current HRnet UI.

---

## 📦 Installation

```bash
npm install @thealamenthed/wealthhealth-modal
```

> ⚠️ **Important**: This package requires **Tailwind CSS v4** to be installed and configured in your project. Make sure you have Tailwind CSS set up before using this component.

---

## 🚀 Usage

```
import { useState } from "react";
import Modal from "@thealamenthed/wealthhealth-modal";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-indigo-600 text-white px-4 py-2"
      >
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Employee Created!"
      >
        <p className="text-gray-700 mt-2">
          The employee record has been saved successfully.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setOpen(false)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}
```

## 🧩 API

### `<Modal />`

| Prop       | Type       | Required | Description                                                           |
| ---------- | ---------- | -------- | --------------------------------------------------------------------- |
| `isOpen`   | `boolean`  | ✔        | Controls whether the modal is visible.                                |
| `onClose`  | `function` | ✔        | Fired when the modal should close (ESC, click outside, close button). |
| `children` | `node`     | ✔        | Content displayed inside the modal.                                   |
| `title`    | `string`   | ✖        | Optional header text displayed at the top of the modal.               |

## ♿ Accessibility

This modal includes:

- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="modal-title"`
- ESC key closing
- Backdrop click closing

Focus trapping is **not implemented** in this version to remain consistent with the HRnet UI requirements, but it can be added later if needed.

## 🎨 Styling with Tailwind

The modal is styled entirely using **Tailwind CSS v4**, featuring:

- Blurred backdrop
- Soft opacity & scale transitions
- Rounded white dialog
- Animated close button

**Requirement**: Your project must have Tailwind CSS v4 installed and configured. The modal component uses Tailwind utility classes that need to be processed by Tailwind's build system.

You can override or extend the panel's appearance by editing the Tailwind classes directly in the JSX.

## 🔧 Development & build

Clone and install

```
git clone https://github.com/thealamenthed/-wealthhealth-modal.git
cd wealthhealth-modal
npm install
```

Build the package

```
npm run build
```

Test locally in another project

```
npm link
npm link @thealamenthed/wealthhealth-modal
```

## 📜 License

MIT © Dalila Lé
