class CreateLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :links do |t|
      t.references :topic, null: true, index: true
      t.integer :order, default: 0
      t.boolean :completed, default: false
      t.string :url, null: false
      t.string :title, null: true
      t.text :notes, null: true

      t.timestamps
    end
  end
end
