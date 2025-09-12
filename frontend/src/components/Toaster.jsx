import { useToast } from "../hooks/useToast";

export default function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`transition-all duration-300 transform ${
            t.open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          } bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg`}
        >
          <strong className="block">{t.title}</strong>
          {t.description && (
            <p className="text-sm opacity-90">{t.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
