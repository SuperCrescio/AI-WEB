import React from "react";
import Notification from "./Notification";
export default function NotificationStack({ notifications = [], onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {notifications.map(notif => (
        <Notification
          key={notif.id}
          {...notif}
          onClose={() => onClose && onClose(notif.id)}
        />
      ))}
    </div>
  );
}
