import Block from '../../utils/Block';
import template from './chatList.hbs';
import { Chat } from '../UserChat';
import styles from './chatList.scss';
import { withStore } from '../../utils/Store';
import ChatsController from '../../controllers/ChatController';
import MessagesController from '../../controllers/MessagesController';
import { Link } from '../Link';
import { ChatInfo } from '../../interfaces/interfaces';


interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({...props});
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
  }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map(data => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, styles});
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ChatsList = withChats(ChatsListBase);
