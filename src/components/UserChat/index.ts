import Block from '../../utils/Block';
import template from './userChat.hbs';
import styles from './userChat.scss';
import { withStore } from '../../utils/Store';
import { ChatInfo } from '../../interfaces/interfaces';


interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
    console.log(props)
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, isSelected: this.props.id === this.props.selectedChat?.id , styles});
  }
}

export const withSelectedChat = withStore(state => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export const Chat = withSelectedChat(ChatBase);
