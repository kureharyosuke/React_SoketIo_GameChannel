const initialState = {
  channel: "",
  name: "",
};

const SET_INIT = "CHANNEL/SET_INIT";

export const onChannelInit = (channel) => async (dispatch) => {
  dispatch({
    type: SET_INIT,
    channel: channel,
  });
};

export const Channel = function (state = initialState, action) {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        channel: action.channel,
      };
    default:
      return state;
  }
};
