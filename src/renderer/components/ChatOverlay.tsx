import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ChatOverlay.css';
import { setOverlay } from '../store/slices/blockchain';

const ChatOverlay = () => {
  const chat = useSelector((state: any) => state.blockchain.chat);
  const overlayRef = React.useRef<any>(null);
  const containerRef = React.useRef<any>(null);

  const dispatch = useDispatch();

  const containerClass = chat.overlay
    ? 'chat-container visible'
    : 'chat-container hidden';

  const overlayClass = chat.overlay ? 'chat-overlay visible' : 'chat-overlay';

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function handleClickOutside(event: { target: any }) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        containerRef.current.classList.add('hidden');
        containerRef.current.classList.remove('visible');

        overlayRef.current.classList.add('hidden');
        overlayRef.current.classList.remove('visible');

        timeoutId = setTimeout(() => {
          dispatch(setOverlay(false));
        }, 300);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [chat.overlay, dispatch]);
  return (
    <>
      {chat.overlay ? (
        <div className={overlayClass} ref={overlayRef}>
          <div className={containerClass} ref={containerRef}>
            <h5>Node Bot</h5>
            <ul className="chat__message-container">
              <li>
                <span>NAME</span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </li>
              <li>
                <span>NAME</span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </li>
              <li>
                <span>NAME</span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </li>
              <li>
                <span>NAME</span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </li>
              <li>
                <span>NAME</span>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </li>
            </ul>
            <div className="chat__text-bar">
              <input type="text" placeholder="Ask Node Bot..." />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChatOverlay;
