import { useRef, useEffect } from "react";
import useChatStore from "@entities/chat/model/store.js";
import { MessageItem } from "@entities/message/ui/MessageItem.jsx";
import { formatTime } from "@entities/message/model/formatTime.js";

/**
 * MessageList — список сообщений активной комнаты.
 *
 * onSelectTime(timeStr)     — клик по времени
 * onSelectNickname(nick)    — клик по нику автора
 * selectedNickname          — текущий выбранный ник (подсветка)
 * selectedTimes             — массив выбранных меток времени
 */
export function MessageList({
  onSelectTime,
  onSelectNickname,
  selectedNickname,
  selectedTimes,
}) {
  const activeRoom = useChatStore((s) => s.activeRoom);
  const messages = useChatStore((s) => s.messages);
  const currentUserId = useChatStore((s) => s.currentUserId);
  const bottomRef = useRef(null);

  const roomMessages = activeRoom ? (messages[activeRoom] ?? []) : [];

  // Автоскролл вниз при новых сообщениях
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages.length]);

  if (!activeRoom) {
    return (
      <div className="text-center text-muted mt-3">
        <p>Выберите комнату</p>
      </div>
    );
  }

  return (
    // ===== БЛОК СООБЩЕНИЙ (список сообщений активной комнаты) =====
    <>
      {roomMessages.length === 0 && (
        <p className="text-center text-muted mt-3">Нет сообщений</p>
      )}

      {roomMessages.map((msg) => {
        const timeStr = formatTime(msg.timestamp);
        return (
          // --- Само сообщение (один элемент списка) ---
          <li>
            <MessageItem
              key={msg.id}
              message={msg}
              timeStr={timeStr}
              isSelf={String(msg.userId) === String(currentUserId)}
              isNickSelected={selectedNickname === msg.nickname}
              isTimeSelected={selectedTimes.includes(timeStr)}
              onSelectTime={onSelectTime}
              onSelectNickname={onSelectNickname}
            />
          </li>
        );
      })}
      <div ref={bottomRef} />
    </>
  );
}
