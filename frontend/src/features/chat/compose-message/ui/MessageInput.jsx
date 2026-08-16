import { useState, useCallback } from "react";
import useChatStore from "@entities/chat/model/store.js";
import { Message } from "./Message.jsx";

/**
 * MessageInput — поле ввода сообщения.
 *
 * nickname            — ник текущего пользователя
 * selectedNickname     string | null    — выбранный ник (реплай)
 * selectedTimes        string[]         — выбранные временные метки (до 3)
 * onClearNickname      () => void
 * onClearTime          (t: string) => void
 * onClearAllTimes      () => void
 */
export function MessageInput({
  nickname,
  selectedNickname,
  selectedTimes,
  onClearNickname,
  onClearTime,
  onClearAllTimes,
}) {
  const [text, setText] = useState("");
  const activeRoom = useChatStore((s) => s.activeRoom);
  const sendMessage = useChatStore((s) => s.sendMessage);

  const handleSend = useCallback(() => {
    if (!activeRoom || !text.trim()) return;

    // Собираем финальный текст: [timePart] [nickPart] userText
    const parts = [];

    if (selectedTimes.length > 0) {
      parts.push(selectedTimes.join(" "));
    }

    if (selectedNickname) {
      parts.push(selectedNickname);
    }

    parts.push(text.trim());

    const finalText = parts.join(" ");

    sendMessage({ roomId: activeRoom, nickname, text: finalText });

    setText("");
    // Очищаем временные метки после отправки
    onClearAllTimes();
    // Ник по текущей логике НЕ очищаем автоматически
  }, [
    activeRoom,
    text,
    selectedNickname,
    selectedTimes,
    nickname,
    sendMessage,
    onClearAllTimes,
  ]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // ===== БЛОК ИНПУТ (поле ввода сообщения + отправка) =====
    <>
      {/* --- Доп. блок: превью выбранных меток (реплай/время) над инпутом --- */}
      <Message
        selectedNickname={selectedNickname}
        selectedTimes={selectedTimes}
        onClearNickname={onClearNickname}
        onClearTime={onClearTime}
        onClearAllTimes={onClearAllTimes}
      />

{/* --- Сам инпут ввода (текстовое поле) --- */}
<div className="col">
  <div className="chat-input-links ms-md-2 me-md-0">
    
            <input
              className="form-control form-control-lg bg-light border-light"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedNickname
                  ? selectedNickname
                  : activeRoom
                    ? "Введите сообщение..."
                    : "Выберите комнату"
              }
              disabled={!activeRoom}
              maxLength={1000}
            />
            </div>
            {/* --- Кнопка отправки сообщения --- */}
            <div class="col-auto">
              <ul class="list-inline mb-0">
              <li class="list-inline-item">
            <button
              className="btn btn-primary font-size-16 btn-lg chat-send"
              onClick={handleSend}
              disabled={!activeRoom || !text.trim()}
            >
              Отправить
            </button>
            </li>
            </ul>
            </div>
            </div>
    </>
  );
}