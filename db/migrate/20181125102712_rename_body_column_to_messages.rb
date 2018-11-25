class RenameBodyColumnToMessages < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :body, :content
  end
end
