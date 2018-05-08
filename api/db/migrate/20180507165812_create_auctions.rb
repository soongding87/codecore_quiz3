class CreateAuctions < ActiveRecord::Migration[5.1]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :description
      t.datetime :ends_on
      t.string :price

      t.timestamps
    end
  end
end
