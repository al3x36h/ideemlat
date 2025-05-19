// src/components/ui/Modal.tsx
import { ReactNode } from "react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
