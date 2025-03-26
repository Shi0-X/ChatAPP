const en = {
  translation: {
    name: 'Hexlet Chat',
    messagesTitle: 'Messages',
    entry: 'Log in',
    exit: 'Log out',
    registration: 'Registration',
    makeRegistration: 'Sign up',
    noAccount: 'No account?',
    invalidFeedback: 'Invalid username or password',
    pageNotFound: 'Page not found',
    redirect: 'But you can go ',
    mainPage: 'to the main page',
    channelsTitle: 'Channels',
    newMessage: 'New message',
    messageBody: 'Message cannot be empty',
    send: 'Send',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    update: 'Update',
    reauthorization: 'Re-authenticate',

    regRules: {
      name: 'Must be from 3 to 20 characters',
      password: 'Must be > 6 characters',
      passwordEquality: 'Passwords must match',
    },

    placeholders: {
      login: 'Your nickname',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      newMessage: 'Enter a message...',
    },

    messagesCounter: {
      messages_zero: 'No messages',
      messages_one: '{{count}} message',
      messages_few: '{{count}} messages',
      messages_many: '{{count}} messages',
    },

    modal: {
      add: 'Add channel',
      toggle: 'Channel management',
      rename: 'Rename',
      renameChannel: 'Rename channel',
      remove: 'Remove',
      removeChannel: 'Remove channel',
      channelName: 'Channel name',
      confirm: 'Are you sure?',
      unique: 'Must be unique',
      lengthParams: 'From 3 to 20 characters',
      menu: 'Manage channel',
    },

    success: {
      newChannel: 'Channel created',
      removeChannel: 'Channel removed',
      renameChannel: 'Channel renamed',
    },

    errors: {
      invalidFeedback: 'Username or password are incorrect',
      userExist: 'This user already exists',
      required: 'Required field',
      network: 'Connection error',
      message: 'Error adding message',
      channelAdd: 'Error adding channel',
      channelRemove: 'Error removing channel',
      channelRename: 'Error renaming channel',
    },
  },
};

export default en;
