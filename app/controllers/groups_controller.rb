class GroupsController < ApplicationController

  def new
    @group = Group.new
  end

  def edit
  end

  def create
    if Group.create(groups_params)
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def update
  end

  private

  def groups_params
    params.require(:group).permit(:name, :member)
  end
end
