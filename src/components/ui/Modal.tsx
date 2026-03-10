import type { ReactElement } from "react";

type Props = {
  title: string;
  message: string;
};

type ModalComponent = (({ title, message }: Props) => ReactElement) & {
  show: (title: string, message: string) => HTMLDialogElement;
};

const Modal = (({ title, message }: Props) => {
  return (
    <dialog open className="rounded-xl border border-gray-300 p-6 shadow-lg">
      <div className="space-y-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </dialog>
  );
}) as ModalComponent;

Modal.show = (title: string, message: string) => {
  const modal = document.createElement("dialog");
  modal.className =
    "fixed left-1/2 top-1/2 w-[min(92vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-300 bg-white p-6 shadow-xl backdrop:bg-black/40 transition-opacity duration-300 opacity-100";

  const content = document.createElement("div");
  content.className = "space-y-4";

  const heading = document.createElement("h2");
  heading.className = "text-lg font-semibold";
  heading.textContent = title;

  const text = document.createElement("p");
  text.className = "text-sm text-gray-700";
  text.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "rounded-md bg-brand px-4 py-2 text-white";
  closeButton.textContent = "Cerrar";

  let isClosing = false;
  const closeWithFade = () => {
    if (isClosing) return;
    isClosing = true;
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    window.setTimeout(() => modal.close(), 300);
  };

  closeButton.addEventListener("click", closeWithFade);
  modal.addEventListener("close", () => modal.remove());

  content.appendChild(heading);
  content.appendChild(text);
  content.appendChild(closeButton);
  modal.appendChild(content);
  document.body.appendChild(modal);
  modal.showModal();
  window.setTimeout(closeWithFade, 1000);

  return modal;
};

export default Modal;