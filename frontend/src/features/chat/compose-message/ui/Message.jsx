/**
 * Message — превью меток, прикреплённых к сообщению перед отправкой:
 * выбранный ник (реплай) и выбранные временные метки. Рендерится
 * в MessageInput над полем ввода, пока есть активный выбор.
 *
 * selectedNickname — string | null
 * selectedTimes    — string[]
 * onClearNickname  — () => void
 * onClearTime      — (t: string) => void
 * onClearAllTimes  — () => void
 */
export function Message({
  selectedNickname,
  selectedTimes,
  onClearNickname,
  onClearTime,
  onClearAllTimes,
}) {
  const hasSelection = selectedNickname || selectedTimes.length > 0;
  if (!hasSelection) return null;

  return (
    // ===== ДОП. БЛОК: превью выбранных меток (реплай-ник + временные метки) =====
    <div style={styles.tokens}>
      {selectedNickname && (
        <span style={styles.nickToken}>
          @{selectedNickname}
          <button
            style={styles.tokenClose}
            onClick={onClearNickname}
            title="Убрать выбранный ник"
          >
            ×
          </button>
        </span>
      )}

      {selectedTimes.map((t) => (
        <span key={t} style={styles.timeToken}>
          [{t}]
          <button
            style={styles.tokenClose}
            onClick={() => onClearTime(t)}
            title={`Убрать метку ${t}`}
          >
            ×
          </button>
        </span>
      ))}

      {selectedTimes.length > 1 && (
        <button style={styles.clearAll} onClick={onClearAllTimes}>
          Очистить всё
        </button>
      )}
    </div>
  );
}

const styles = {
  tokens: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 6,
    alignItems: "center",
  },
  nickToken: {
    display: "inline-flex",
    alignItems: "center",
    background: "#fff3e0",
    border: "1px solid #ffb74d",
    borderRadius: 12,
    padding: "2px 8px",
    fontSize: 13,
    color: "#e65100",
    gap: 4,
  },
  timeToken: {
    display: "inline-flex",
    alignItems: "center",
    background: "#e3f2fd",
    border: "1px solid #64b5f6",
    borderRadius: 12,
    padding: "2px 8px",
    fontSize: 13,
    color: "#1565c0",
    gap: 4,
  },
  tokenClose: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 15,
    lineHeight: 1,
    padding: 0,
    color: "inherit",
    opacity: 0.7,
  },
  clearAll: {
    background: "none",
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: "2px 10px",
    fontSize: 12,
    cursor: "pointer",
    color: "#666",
  },
};