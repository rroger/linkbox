# frozen_string_literal: true

module Api
  module V1
    class LinksController < ApiController
      before_action :set_link, only: %i[show update destroy]

      def index
        render_links(Link.all)
      end

      def show
        render_links(@link)
      end

      def create
        link = Link.new(link_params)

        if link.save
          render_links(link, :created)
        else
          render_error(link, :unprocessable_entity)
        end
      end

      def update
        if @link.update(link_params)
          render_links(@link)
        else
          render_error(@link, :unprocessable_entity)
        end
      end

      def destroy
        if @link.destroy
          head :no_content
        else
          render_error(@link, :unprocessable_entity)
        end
      end

      private

      def set_link
        @link = Link.find(params[:id])
      end

      def link_params
        params.require(:data).permit(
          :id,
          :type,
          attributes: %i[topic_id url title notes order completed]
        ).fetch(:attributes, [])
      end

      def render_links(links, status = :ok)
        render status, json: ::LinkSerializer.new(links)
      end

      def render_error(link, status)
        render json: link.errors, status: status
      end
    end
  end
end
