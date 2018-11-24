class MessagesController < ApplicationController
  def index
  end

  def create
    if Message.create(message_params)
      redirect_to group_messages_path(@group)
    else
      redirect_to group_messages_path(@group), alert: "メセージを入力してください"
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image)
  end

end
