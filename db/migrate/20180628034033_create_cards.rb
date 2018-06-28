class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string "cid", null: false
      t.integer "dbf_id"
      t.text "name"
      t.text "description"
      t.text "flavor"
      t.text "artist"
      t.integer "attack"
      t.string "card_class"
      t.boolean "collectible"
      t.integer "cost"
      t.boolean "elite"
      t.string "faction"
      t.integer "health"
      t.string "rarity"
      t.string "set"
      t.string "card_type"

      t.timestamps
    end

    add_index "cards", ["cid"], :unique => true
    add_index "cards", ["dbf_id"], :unique => true
  end
end
