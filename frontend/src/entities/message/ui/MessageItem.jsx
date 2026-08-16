/**
 * MessageItem — рендер одного сообщения в списке.
 * Возвращает единственный <li>; список <ul> оформляется вызывающей
 * стороной (см. features/chat/view-messages/ui/MessageList.jsx).
 *
 * onSelectTime(timeStr)     — клик по времени
 * onSelectNickname(nick)    — клик по нику автора
 * isSelf                    — собственное сообщение (ник не кликабелен)
 * isNickSelected            — подсветка выбранного ника
 * isTimeSelected            — подсветка выбранной метки времени
 */
export function MessageItem({
  message,
  timeStr,
  isSelf,
  isNickSelected,
  isTimeSelected,
  onSelectTime,
  onSelectNickname,
}) {
  return (
    // ===== САМО СООБЩЕНИЕ (один элемент: время + ник + текст) =====
    <ul className="list-unstyled mb-0">
    <li>
      <div className="conversation-list">
        <span
          style={{
            ...styles.time,
            ...(isTimeSelected ? styles.timeSelected : {}),
          }}
          onClick={() => onSelectTime(timeStr)}
          title="Нажмите, чтобы добавить метку времени"
        >
          [{timeStr}]
        </span>

        {isSelf ? (
          <span style={styles.nickSelf}>{message.nickname}</span>
        ) : (
          <span
            style={{
              ...styles.nick,
              ...(isNickSelected ? styles.nickSelected : {}),
            }}
            onClick={() => onSelectNickname(message.nickname)}
            title={`Выбрать @${message.nickname}`}
          >
            {message.nickname}
          </span>
        )}

        <span style={styles.text}>{message.text}</span>
      </div>
    </li>
    </ul>
  );
}

const styles = {
  time: {
    color: "#999",
    cursor: "pointer",
    marginRight: 6,
    userSelect: "none",
  },
  timeSelected: {
    color: "#4a90e2",
    fontWeight: 700,
  },
  nick: {
    color: "#2a6db5",
    cursor: "pointer",
    marginRight: 6,
    userSelect: "none",
  },
  nickSelected: {
    color: "#e04b00",
    fontWeight: 700,
  },
  nickSelf: {
    color: "#555",
    marginRight: 6,
    cursor: "default",
  },
  text: {
    color: "#222",
  },
};