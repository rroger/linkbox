# frozen_string_literal: true

module Api
  module V1
    class LinksController < ApplicationController
      before_action :set_api_v1_link, only: %i[show update destroy]

      def index
        @api_v1_links = Link.all
      end

      def show; end

      def create
        @api_v1_link = Link.new(api_v1_link_params)

        if @api_v1_link.save
          render :json, status: :created, location: @api_v1_link
        else
          render json: @api_v1_link.errors, status: :unprocessable_entity
        end
      end

      def update
        if @api_v1_link.update(api_v1_link_params)
          render :json, status: :ok, location: @api_v1_link
        else
          render json: @api_v1_link.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @api_v1_link.destroy
        head :no_content
      end

      private

      def set_api_v1_link
        @api_v1_link = Link.find(params[:id])
      end

      def api_v1_link_params
        params.require(:api_v1_link).permit(:topic_id, :url, :title, :notes)
      end
    end
  end
end
